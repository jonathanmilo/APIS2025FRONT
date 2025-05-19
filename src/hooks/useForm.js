import { useState } from "react";
import { validateField, validateForm } from "@src/utils/validation";

export default function useForm(initialValues, validationRules) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value, validationRules, {
      ...formData,
      [name]: value,
    });

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleValidation = () => {
    const newErrors = validateForm(formData, validationRules);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    errors,
    handleChange,
    handleValidation,
    setFormData,
  };
}
