// "use client";

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// // import { apiURI } from "@/api/apiFetcher";

// const Page: React.FunctionComponent = () => {
//   const { register, handleSubmit } = useForm();
//   const [result, setResult] = useState("");

//   const onSubmit = async (data) => {
//     console.log(data);

//     setResult("Sending...");
//     const formData = new FormData();

//     console.log("ui file", data.coverImage[0]);
//     formData.append("coverFile", data.coverImage[0]);
//     formData.append("title", data.title);

//     // for (const key in data) {
//     //     console.log("key",key)
//     //   if (key === "coverImage") {
//     //     formData.append(key, data[key][0]);
//     //   } else {
//     //     formData.append(key, data[key]);
//     //   }
//     // }
//     console.log("UI formData - file", formData.get("coverImage"));
//     // const res = await apiURI
//     //   .post("books", data, {
//     //     headers: { "Content-Type": "multipart/form-data" },
//     //   })
//     //   .then((res) => res.data);
//     const res = await fetch("http://192.168.0.69:5173/api/books", {
//       method: "POST",
//       body: data,
//     }).then((res) => res.json());
//     console.log("res", res);
//   };
//   return (
//     <div>
//       <h1>React Hook Form file upload</h1>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input type="text" placeholder="Book Title" {...register("title")} />
//         <br />
//         <br />
//         <input type="file" {...register("coverImage")} />
//         <br />
//         <br />
//         <input type="submit" />
//       </form>
//       <br />
//       <span>{result}</span>
//     </div>
//   );
// };

// export default Page;
import React from "react";

const page = () => {
  return <div>page</div>;
};

export default page;
