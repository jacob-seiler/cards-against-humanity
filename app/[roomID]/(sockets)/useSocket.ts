import { useContext } from "react";
import SocketContext from "./SocketContext";

export default function useSocket() {
    const { socket } = useContext(SocketContext);

    return { socket }
}
