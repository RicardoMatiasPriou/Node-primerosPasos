import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePosts } from "../context/postContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function PostForm() {
  const { createPost, getPost } = usePosts();
  const navigate = useNavigate();
  const params = useParams();
  const [post, setPost] = useState({
    title:'',
    description:'',
  })
  useEffect(() => {
    (async()=>{
      if(params.id){
       const post =await getPost(params.id)
        setPost(post)
      }})()
  },[])

  return (
    <>
      <div>
        <Formik
          initialValues={post}
          validationSchema={Yup.object({
            title: Yup.string().required("titulo es requerido"),
            description: Yup.string().required("description es requerido"),
          })}
          onSubmit={async (values, actions) => {
            await createPost(values);
            navigate("/");
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                name="title"
                placeholder="title"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="title"
              />

              <Field
                name="description"
                placeholder="description"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="description"
              />

              <button type="submit">save</button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
