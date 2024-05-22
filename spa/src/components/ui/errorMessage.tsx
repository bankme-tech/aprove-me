interface Props {
  error: any;
}

export default function ErrorMessage(props: Props) {
  return props.error &&
    <p className="min-w-64 w-full text-red-600 text-center text-sm text-wrap bg-red-600 bg-opacity-20 rounded p-1 border border-red-600 border-opacity-20">
      {props.error.message}
    </p>

}