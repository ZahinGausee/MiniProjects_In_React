import React from 'react'
import { Controller } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react'


function RTE({name, control, label, defaulValues = ""}) {
  
  return (
    <div className='w-full'> 
      {label && <label className='inline-block mb-1 pl-1'>
        {label}
      </label>
      }
      <Controller
      name={name || "content"}
      control={control}
      render={({
        field: {
          onChange
        }
      }) => (
          <Editor 
          apiKey='uz3mvgj3haj9wy66866vujj3g3gsmz9rw1u2zzze7ih3xp9b'
          initialValue={defaulValues}
          init={{
            initialValue: {defaulValues},
            height: 500,
            menubar: false,
            plugins: [
              "image",
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
              "anchor", 
            ],
            toolbar: 
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
          onEditorChange={onChange}
          />
      )}
      />
    </div>
  )
}

export default RTE