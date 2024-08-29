<template>
  <div class="create-post">
    <div class="container">
        <div :class="{ invisible: !error }" class="err-message">
            <p><span>Error:</span>{{ this.errorMsg }}</p>
        </div>
        <div class="blog-info">
            <input type="text" placeholder="Enter Blog Title" v-model="blogTitle">
            <div class="upload-file">
                <label for="blog-photo" class="upload-label">Upload Cover Photo</label>
                <input @change="fileChange" type="file" ref="blogPhoto" id="blog-photo" accept=".png, .jpg, .jpeg">
                <button @click="openPreview" class="preview"
                    :class="{ 'button-inactive': !this.$store.state.blogPhotoFileURL }">Preview
                    Photo</button>
                <span>File Chosen:{{ this.$store.state.blogPhotoName }}</span>
            </div>
        </div>
        <div class="editor">
            <QuillEditor theme="snow"  v-model="blogHTML" useCustomImageHandler />
        </div>
        <div class="blog-actions">
            <button @click="uploadBlog">Publish Blog</button>
            <router-link class="router-button" to="#">Post Preview</router-link>
        </div>
    </div>
  </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import Quill from "quill"
import ImageResize from 'quill-image-resize-vue';
window.Quill = Quill
Quill.register("module/imageResize", ImageResize)
export default {
  name: "CreatePost",
  components: {
    QuillEditor
  },
  data() {
    return {
      error: null,
      errorMessage: null,
      editorSettings: {
        modules: {
          imageResize: {}
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.create-post {
    position: relative;
    height: 100%;

    button {
        margin-top: 0px !important;
    }

    .router-button {
        text-decoration: none;
        color: #fff;
    }

    label,
    button,
    .router-button {
        transition: 0.5s ease-in-out all;
        align-self: center;
        font-size: 14px;
        cursor: pointer;
        border-radius: 20px;
        margin-top: 0px !important;
        padding: 12px 24px;
        color: #fff;
        background-color: #303030;
        text-decoration: none;

        &:hover {
            background-color: rgba(48, 48, 48, 0.7);
        }
    }

    .container {
        position: relative;
        height: 100%;
        padding: 10px 25px 60px;
    }

    // error styling 
    .invisible {
        opacity: 0 !important;
    }

    .err-message {
        width: 100%;
        padding: 12px;
        border-radius: 8px;
        color: #fff;
        margin-bottom: 10px;
        background-color: #303030;
        opacity: 1;
        transition: 0.5s ease all;

        p {
            font-size: 14px;
        }

        span {
            font-weight: 600;
        }
    }

    .blog-info {
        display: flex;
        margin-bottom: 32px;

        input:nth-child(1) {
            min-width: 300px;
        }

        input {
            transition: 0.5 ease-in-out all;
            padding: 10px 4px;
            border: none;
            border-bottom: 1px solid #303030;

            &:focus {
                outline: none;
                box-shadow: 0 1px 0 0 #303030;
            }
        }

        .upload-file {
            flex: 1;
            margin-left: 16px;
            position: relative;
            display: flex;
            overflow: hidden;
            input {
                display: none;
            }

            .preview {
                margin-right: 16px;
                text-transform: inherit;
            }

            span {
                font-style: 12px;
                margin-left: 12px;
                align-self: center;
            }

            .upload-label {
              margin-right: 20px;
            }
        }
    }

    .editor {
        height: 60vh;
        display: flex;
        flex-direction: column;

        .quillWrapper {
            position: relative;
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .ql-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow: scroll;
        }
    }
    
    .blog-actions {
      display: flex;
      align-items: center;
      gap: 15px;
      padding-top: 15px;
    }
}
@media (max-width:787px) {
    .blog-info{
        display: flex;
        flex-direction: column;
        gap: 1.3rem;
        font-size: 11px !important;
        
        .upload-file {
            display: grid !important;
            grid-template-columns:repeat(2,1fr);
            gap: 0.6rem;
            margin-left: 0px !important;
            overflow: hidden;
            span {
                grid-column: 1/3;
            }
        }
    }
}
</style>