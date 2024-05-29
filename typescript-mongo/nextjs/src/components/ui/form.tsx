import RadixForm from '@radix-ui/react-form';

export const FormValidityState = (
  props: RadixForm.ScopedProps<RadixForm.FormValidityStateProps>,
  name: string,
) => (
  <RadixForm.ValidityState
    name={name}
    {...props}
  />
);

export const Form = () => (
  <RadixForm.Form>
    <RadixForm.Message />
    <FormValidityState name="form">
      {(validity: ValidityState | undefined) =>
        validity?.valid ? null : (
          <p>
            {validity?.customError ||
              validity?.badInput ||
              validity?.patternMismatch ||
              validity?.rangeOverflow ||
              validity?.rangeUnderflow ||
              validity?.stepMismatch ||
              validity?.tooLong ||
              validity?.tooShort ||
              validity?.typeMismatch ||
              validity?.valueMissing}
          </p>
        )
      }
    </FormValidityState>
  </RadixForm.Form>
);

export const FormSubmit = () => <RadixForm.Submit />;
