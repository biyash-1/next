import UploadBox from "@/app/components/UploadBox";

const page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 px-4">
      <h1 className="text-3xl font-bold text-white mb-8">AI Resume Scanner</h1>
      <UploadBox />
    </div>
  );
};

export default page;