#!/bin/sh

# Directory in which librarian-puppet should manage its modules directory
PUPPET_DIR=/etc/puppet/

# NB: librarian-puppet might need git installed. If it is not already installed
# in your basebox, this will manually install it at this point using apt or yum
GIT=/usr/bin/git
APT_GET=/usr/bin/apt-get
YUM=/usr/sbin/yum
if [ ! -x $GIT ]; then
    if [ -x $YUM ]; then
        yum -q -y makecache
        yum -q -y install git
    elif [ -x $APT_GET ]; then
        apt-get -q -y update
        apt-get -q -y install git
    else
        echo "No package installer available. You may need to install git manually."
    fi
fi

cp /vagrant/Puppetfile $PUPPET_DIR

if [ "$(gem search -i librarian-puppet)" = "false" ]; then
  gem install librarian-puppet
  cd $PUPPET_DIR && librarian-puppet install --clean
else
  cd $PUPPET_DIR && librarian-puppet update
fi