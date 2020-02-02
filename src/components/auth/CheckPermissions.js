const CheckPermissions = user => {
    console.log('Checking AUTH for user ', user)
    if (user.email && user.role) return true
}
export default CheckPermissions
