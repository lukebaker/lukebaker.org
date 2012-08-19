<?php

$flickr_api_key = 'xxx';
$flickr_api_secret = 'xxx';
$nick = 'your smugmug name here';
$recent_count = '10';
$images_per_album = 2;
$photos_seen_log = dirname(__FILE__) . '/photos_seen.log';

$smugmug_recent_feed = "http://{$nick}.smugmug.com/hack/feed.mg?Type=nicknameRecent&Data={$nick}&format=atom03&ImageCount={$recent_count}";

/* initialize */
ini_set('max_execution_time', 0);
set_include_path(get_include_path() . PATH_SEPARATOR . dirname(__FILE__));
require_once 'Phlickr/Api.php';
require_once 'Phlickr/Uploader.php';

$flickr_api = new Phlickr_Api($flickr_api_key, $flickr_api_secret);
flickr_authenticate($flickr_api);
$uploader = new Phlickr_Uploader($flickr_api);

$photos_seen = get_photos_seen($photos_seen_log);

$xml = new SimpleXMLElement(file_get_contents($smugmug_recent_feed));

$album_count = array();
$photo_ids = array();
foreach ($xml->entry as $recent_photo) {
    $thumb_url = current($recent_photo->id);
    $album_link = current($recent_photo->link['href']);
    if (preg_match('/\/photos\/([0-9]+)\-.*?\.jpg$/', $thumb_url, $matches)) {
        $sm_photo_id = $matches[1];
    }
    if (preg_match('/\/gallery\/([0-9]+)#/', $album_link, $matches)) {
        $sm_album_id = $matches[1];
    }

    if (!array_key_exists($sm_album_id, $album_count)) {
        $album_count[$sm_album_id] = 0;
    }

    if ($album_count[$sm_album_id] < $images_per_album && !$photos_seen[$thumb_url]) {
        $album_count[$sm_album_id]++;
        print "Downloading $sm_photo_id ... ";
        file_put_contents(dirname(__FILE__) . "/tmp.jpg",
            file_get_contents(str_replace('-Th', '-L', $thumb_url)));
        print "done\n";
        print "Uploading   $sm_photo_id ... ";
        $photo_ids[] = $uploader->upload(dirname(__FILE__) . "/tmp.jpg",
            $sm_photo_id, "I've recently uploaded images to my SmugMug account.  <a href='{$album_link}'>Check them out.</a>");
        print "done\n";
    }
    $photos_seen[$thumb_url] = true;
}
if (count($photo_ids)) {
    printf("All done! If you care to make some changes:\n%s\n\n", $uploader->buildEditUrl($photo_ids));
}

file_put_contents($photos_seen_log, serialize($photos_seen));

function get_photos_seen($photos_seen_log) {
    if (file_exists($photos_seen_log)) {
        $seen = unserialize(file_get_contents($photos_seen_log));
    }
    return (is_array($seen)) ? $seen : array();
}

function flickr_authenticate(&$flickr_api) {
    $flickr_frob = $flickr_api->requestFrob();
    $flickr_auth_url = $flickr_api->buildAuthUrl('write', $flickr_frob);
    print "\nOpen the following URL and authorize:\n$flickr_auth_url\n";
    print "\nPress return when you're finished...\n";
    fgets(STDIN);
    $token = $flickr_api->setAuthTokenFromFrob($flickr_frob);
    $flickr_api->setAuthToken($token);
}

?>
