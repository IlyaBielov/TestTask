export function checkUserName(user: { name: string }, name: string): boolean {
  return user.name.trim().toLocaleLowerCase().includes(name.trim().toLocaleLowerCase());
}
