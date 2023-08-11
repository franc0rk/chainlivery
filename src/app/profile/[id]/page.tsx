export default function Page({ params }: any) {
  return (
    <div className="flex flex-wrap p-4">
      <div className="w-1/4">
        <div className="p-4 m-2 border border-gray-900 rounded-md">
          <img src="x.jpg"></img>
          <p>name</p>
          <span>verified with wc</span>
          <div>5 stars</div>
          <div>reviews</div>
        </div>
      </div>
      <div className="w-3/4">
        <div className="p-4 m-2 border border-gray-900 rounded-md">
          <div>
            <h2>Listings</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
