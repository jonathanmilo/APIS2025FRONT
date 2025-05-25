import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Typography,
  FormHelperText,
  Box,
} from "@mui/material";
import DropzoneUploader from "../../../components/DropzoneUploader";
import { RxCross1 } from "react-icons/rx";

const FloatingFormDialog = ({
  open,
  onClose,
  onSave,
  formData,
  setFormData,
  fields = [],
  title = "Form",
  handleChange,
}) => {
  const onChange =
    handleChange ||
    ((e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <RxCross1 className="text-brand-black" />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {fields.map((field) => (
          <div key={field.name}>
            {field.type === "file" ? (
              <>
                <DropzoneUploader
                  onUpload={(name, file) =>
                    setFormData({ ...formData, [name]: file })
                  }
                  fieldName={field.name}
                  currentFile={formData[field.name]}
                />
                {formData[field.name] && (
                  <p className="text-black dark:text-white">
                    Archivo seleccionado: {formData[field.name].name}
                  </p>
                )}
              </>
            ) : (
              <>
                <TextField
                  fullWidth
                  margin="normal"
                  label={field.label}
                  name={field.name}
                  type={field.type || "text"}
                  value={formData[field.name] || ""}
                  onChange={onChange}
                  multiline={field.multiline || false}
                  rows={field.rows || 1}
                  required={field.required || false}
                  error={field.error}
                />
                {field.helperText && (
                  <FormHelperText>{field.helperText}</FormHelperText>
                )}
              </>
            )}
          </div>
        ))}

        <Typography variant="body2" sx={{ mt: 2, color: "gray" }}>
          {fields.length === 0 ? "No fields provided." : ""}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onSave} variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FloatingFormDialog;
