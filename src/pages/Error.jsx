export default function ErrorPage (props) {
  return (
    <div>
      <h2>Render Error</h2>
      <pre>{props.message}</pre>
    </div>
  )
}
