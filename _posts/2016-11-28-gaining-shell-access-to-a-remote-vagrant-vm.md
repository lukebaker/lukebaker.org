---
layout: post
title: Gaining Shell Access to a remote Vagrant VM
---

Occasionally, the need arises to help debug someone else's Vagrant VM that isn't behaving as expected. Once things get beyond the basics, it's often most helpful to be able to have direct access to the VM itself. Here's one way to do that. This technique depends on having a separate server where both parties have SSH access (example.com in this example). Consider the following scenario where Bob is running a Vagrant VM on his computer and would like Alice's help in debugging that VM.

1. Bob should run the following command from within the Vagrant VM: `ssh -nNT -R 9128:localhost:22 bob@example.com`.
2. Alice needs to SSH into example.com as usual (`ssh alice@example.com`) and then run the following command within that SSH session: `ssh vagrant@localhost -p 9128`. Upon entering the correct password (usually 'vagrant' for Vagrant VMs), Alice will have access to Bob's Vagrant VM.

Bob's SSH command connects to example.com as the bob user and sets up remote forwarding between port 9128 on example.com and port 22 on the Vagrant VM. This is what allows Alice's SSH command to talk to the Vagrant VM via port 9128 on example.com. In this example, port 9128 was chosen arbitrarily and could be any number greater than 1024 and less than or equal to 65535. However, it is important that both Bob and Alice agree on the same port number to use as the link on the example.com server.

The SSH command that Bob runs will not get a shell on example.com and will instead run until he stops it with CTRL-C (this is what the `-nNT` flags do). As soon as Bob stops the SSH command, it will break the remote forwarding that was setup and Alice will be disconnected immediately from the Vagrant VM. Those flags are optional, so Bob may leave those off if he desires a shell on example.com, but that's typically not the case.

In the Vagrant VMs that I have used, the password for the vagrant user has been 'vagrant'. However, if that's not the case, Bob could add Alice's public SSH key to the vagrant user's `~/.ssh/authorized_keys` file inside the Vagrant VM. In this case, Alice would need to enable forwarding of her authentication agent when connecting to example.com initially via `ssh -A alice@example.com`.
