class php {
  package {"php5-cli":
    ensure => present
  }

  package {[
    "php5-cgi", "php5-dev", "php-gettext", "php5-common", "php5-curl", "php5-mongo",
    "php5-gd", "php5-mcrypt", "php5-pgsql", "php5-xdebug", "php-xhprof"
  ]:
    ensure => present,
    require => Package["php5-cli"]
  }

  package {"php5-fpm":
    ensure => present,
    require => Package["php5-cgi"]
  }

  service {"php5-fpm":
    ensure => running,
    require => Package["php5-fpm"]
  }
}
