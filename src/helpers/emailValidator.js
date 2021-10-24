export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "Le champ Email ne doit pas être vide."
  if (!re.test(email)) return 'Ooops! Saisissez une adresse mail valide.'
  return ''
}
