import { useState, useCallback } from 'react';

interface FormField {
  value: any;
  error: string | null;
}

interface FormState<T> {
  fields: Record<keyof T, FormField>;
  isSubmitting: boolean;
  submitError: string | null;
}

const useFormState = <T extends Record<string, any>>(initialValues: T) => {
  const [formState, setFormState] = useState<FormState<T>>({
    fields: Object.keys(initialValues).reduce((acc, key) => {
      acc[key as keyof T] = {
        value: initialValues[key],
        error: null,
      };
      return acc;
    }, {} as Record<keyof T, FormField>),
    isSubmitting: false,
    submitError: null,
  });

  const updateField = useCallback(
    (field: keyof T, value: any, error: string | null = null) => {
      setFormState((prev) => ({
        ...prev,
        fields: {
          ...prev.fields,
          [field]: {
            value,
            error,
          },
        },
      }));
    },
    []
  );

  const setFieldError = useCallback((field: keyof T, error: string | null) => {
    setFormState((prev) => ({
      ...prev,
      fields: {
        ...prev.fields,
        [field]: {
          ...prev.fields[field],
          error,
        },
      },
    }));
  }, []);

  const setSubmitting = useCallback((isSubmitting: boolean) => {
    setFormState((prev) => ({
      ...prev,
      isSubmitting,
    }));
  }, []);

  const setSubmitError = useCallback((error: string | null) => {
    setFormState((prev) => ({
      ...prev,
      submitError: error,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormState({
      fields: Object.keys(initialValues).reduce((acc, key) => {
        acc[key as keyof T] = {
          value: initialValues[key],
          error: null,
        };
        return acc;
      }, {} as Record<keyof T, FormField>),
      isSubmitting: false,
      submitError: null,
    });
  }, [initialValues]);

  const getValues = useCallback(() => {
    return Object.keys(formState.fields).reduce((acc, key) => {
      acc[key as keyof T] = formState.fields[key as keyof T].value;
      return acc;
    }, {} as T);
  }, [formState.fields]);

  const validateForm = useCallback(() => {
    const errors = Object.keys(formState.fields).filter(
      (key) => formState.fields[key as keyof T].error !== null
    );
    return errors.length === 0;
  }, [formState.fields]);

  return {
    ...formState,
    updateField,
    setFieldError,
    setSubmitting,
    setSubmitError,
    resetForm,
    getValues,
    validateForm,
  };
};

export default useFormState;