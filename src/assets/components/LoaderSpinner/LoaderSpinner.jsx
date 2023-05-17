import { TailSpin } from "react-loader-spinner";

export default function LoaderSpinner({wrapperClass = "", radius = "1"}) {
  return (
    <TailSpin
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="tail-spin-loading"
      radius={radius}
      wrapperStyle={{}}
      wrapperClass={wrapperClass}
      visible={true}
    />
  );
}
