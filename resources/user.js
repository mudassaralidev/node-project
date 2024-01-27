class UserResource {
  static serialize(user) {
    return {
      id: user?.id,
      email: user?.email,
      name: user?.name
    }
  }
}

export default UserResource