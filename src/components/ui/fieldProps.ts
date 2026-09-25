/** Accessible id/name/aria wiring for a control rendered inside <Field>. */
export const fieldProps = (id: string, error?: string, hint?: string) => ({
  id,
  name: id,
  'aria-invalid': error ? true : undefined,
  'aria-describedby': error || hint ? `${id}-msg` : undefined,
})
