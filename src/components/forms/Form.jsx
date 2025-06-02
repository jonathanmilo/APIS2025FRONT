import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";

export default function Form({
  fields = [],
  validationSchema,
  onSubmit,
  title = "Formulario",
  buttonText = "Enviar",
  validationMode = "onChange",
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: validationMode,
  });

  return (
    <div className="flex-grow flex flex-col items-center justify-center">
      <div className="relative flex flex-col bg-transparent text-black dark:text-white">
        <h4 className="text-2xl text-center font-semibold text-black dark:text-white">
          {title}
        </h4>

        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4 flex flex-col gap-1">
            {fields.map(({ name, label, type = "text" }) => (
              <TextField
                key={name}
                fullWidth
                variant="outlined"
                margin="dense"
                id={name}
                label={label}
                type={type}
                {...register(name)}
                error={Boolean(errors[name])}
                helperText={errors[name]?.message}
                className="text-black dark:text-white"
              />
            ))}
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-primary py-3 px-6 text-white font-bold uppercase shadow-md transition-all hover:shadow-lg"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
