const CheckPermissions = currentUser => {
    console.log('Checking AUTH for user ', currentUser)
    if (currentUser.email && currentUser.role) return true
}
export default CheckPermissions
