import React from "react";

const ImageView = () => {
  return (
    <div class="p-4 sm:ml-64 mt-10">

      <div className="flex justify-center">
        <h3 class="mt-0 mb-2 text-3xl font-medium leading-tight text-primary underline">
          ID Card Image
        </h3>
      </div>

      <img
        src="https://previews.123rf.com/images/photoplotnikov/photoplotnikov1610/photoplotnikov161000024/64932244-id-card-isolated-on-white-background-identification-card-icon-business-identity-id-card-icon.jpg"
        className="w-full "
        alt=""
      />
    
    <div className="flex justify-center">
        <h3 class="mt-0 mb-2 text-3xl font-medium leading-tight text-primary underline">
          Certification  Image
        </h3>
      </div>

      <img
        src="https://previews.123rf.com/images/photoplotnikov/photoplotnikov1610/photoplotnikov161000024/64932244-id-card-isolated-on-white-background-identification-card-icon-business-identity-id-card-icon.jpg"
        className="w-full"
        alt=""
      />
    </div>
  );
};

export default ImageView;
