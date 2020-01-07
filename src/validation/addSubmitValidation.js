export function submitValidator(fieldsSchema) {
  const error = (key, value) => {
    return { status: false, key, value }
  }
  const returnFields = () => {
    const cleanFields = []
    fieldsSchema.map(field => {
      const { key, value } = field
      cleanFields.push({ key, value })
    })
    return cleanFields
  }

  fieldsSchema.map(field => {
    const { key, value, maxLength, varType } = field
    if (!value || value.length >= maxLength || typeof value !== varType)
      error(key, value)
    else returnFields()
  })
}
