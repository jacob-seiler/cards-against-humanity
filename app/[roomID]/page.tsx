import Chat from "./Chat"

export default function RoomPage() {
    return (
        <div className="gird grid-cols-3">
            <div>
                {/* <h2>Players</h2> */}
            </div>
            <div>
                {/* <h2>Rules / Game</h2> */}
            </div>
            <div>
                <Chat />
            </div>
        </div>
    )
}
