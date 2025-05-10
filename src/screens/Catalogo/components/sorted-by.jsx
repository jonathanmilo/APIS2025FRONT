import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

function SortedBy({ type, order, onTypeSend, onOrderSend }) {
  return (
    <div className="flex justify-center md:justify-end">
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="sort-type-label">Ordenar por</InputLabel>
        <Select
          labelId="sort-type-label"
          id="sort-type-select"
          value={type}
          onChange={(e) => onTypeSend(e.target.value)}
          label="Ordenar por"
        >
          <MenuItem value="title">Título</MenuItem>
          <MenuItem value="price">Precio</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 140 }}>
        <InputLabel id="sort-order-label">Orden</InputLabel>
        <Select
          labelId="sort-order-label"
          id="sort-order-select"
          value={order}
          onChange={(e) => onOrderSend(e.target.value)}
          label="Orden"
        >
          <MenuItem value="asc">Ascendente</MenuItem>
          <MenuItem value="desc">Descendente</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default SortedBy;
