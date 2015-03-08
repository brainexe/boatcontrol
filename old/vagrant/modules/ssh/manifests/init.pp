
class ssh {
  $username = hiera('username')
  ssh_keygen {
    $username:
  }
}
