---
---
This PHP script is meant to be run from the command line. It is a quick
hack, which will upload some of your recent photos that are on
[SmugMug][] to Flickr. You may get duplicates on Flickr if you remove
the log file this script creates or move the script without also moving
the log file. You’ll need to alter the top few lines with your own
Flickr API key, Flickr API secret, and SmugMug username. Additionally,
you’ll need to install [Phlickr.][] You’ll find some values at the top
of the file that can alter how the script behaves.  Fiddle with those as
you see fit. This requires PHP5, SimpleXML, and [Phlickr.][]
[http://lukebaker.org/smugmug/export\_recent\_to\_flickr.phps][]

  [SmugMug]: http://smugmug.com/
  [Phlickr.]: http://drewish.com/projects/phlickr/
  [http://lukebaker.org/smugmug/export\_recent\_to\_flickr.phps]: http://lukebaker.org/smugmug/export_recent_to_flickr.phps
