import css from "./Filter.module.css";
export function Filter({ filter, onChangeFilter }) {
  return (
    <input className={css.filter_shape} onChange={onChangeFilter} value={filter} type="text" name="filter" />
  );
}