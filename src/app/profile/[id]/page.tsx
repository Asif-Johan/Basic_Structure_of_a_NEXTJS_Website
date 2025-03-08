export default async function userProfile({params}: any) {
   // console.log("This is params",params.id, params);
    
    return (
        <div className="text-3xl flex flex-col items-center justify-center min-h-screen text-blue-700">
            <h1>Profile id</h1>
            <p>params.id:</p> <span className="text-3xl text-red-700">{await params.id}</span>
        </div>
    );
}