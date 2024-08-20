const Filter = (props) => (
  <div>
    filter shown with <input value={props.filterName} onChange={props.onChange}/>
  </div>
)

export default Filter