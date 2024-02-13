import React, { useCallback, useEffect } from "react";
import DatabaseService from "../../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../../components";

function PostForm({ post }) {
  const {slug} = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        slug: post?.slug || "",
        status: post?.status || "",
      },
    });
  const userData = useSelector((state) => state.auth.userData);
    console.log(userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? DatabaseService.uploadFile(data.image[0])
        : undefined;
      if (file) {
        DatabaseService.deletePost(post.featuredImage);
      }
      const updatePostInDb = await DatabaseService.updatePost(post.$id, {
        ...data,
        featuredImage: file?.$id || undefined,
      });
      if (updatePostInDb) {
        navigate(`/post/${updatePostInDb.$id}`);
      }
    } else {
      const file = await DatabaseService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const newPostInDb = await DatabaseService.createPost({
          ...data,
          userId: userData.$id
        });
        // console.log(newPostInDb, data, userData.$id);
        if (newPostInDb) {
          navigate(`/post/${newPostInDb.$id}`);
        }
      }
      }
  };

  const slugTrasform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue('slug', slugTrasform(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
    
  }, [watch, slugTrasform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title: "
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug: "
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue('slug', slugTrasform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content: "
          name="content"
          control={control}
          defaulValues={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={DatabaseService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
