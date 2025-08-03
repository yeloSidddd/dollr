import acoustic from "../Resources/acoustic.png"

export default function Profile() {
  return (
    <>
      <div className="text-xl font-medium">Profile Settings</div>
      <div className="p-6 flex flex-row items-center">
        <div>
          <img src={acoustic} className="w-[65px] h-[65px] rounded-full" alt="img"></img>
        </div>
        <div className="px-6">
          <h3 className="font-semibold">Acoustic Tamrakar</h3>
          <h3>Acoustic AF</h3>
          <h4>Patan</h4>
        </div>
      </div>
    </>
  );
}
