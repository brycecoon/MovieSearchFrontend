import { useParams } from "react-router-dom";

const ActorDetails = () => {
    const {id} = useParams();
  return (
    <div>ActorDetails {id}</div>
  )
}

export default ActorDetails