<script setup>
import Button from 'primevue/button'
import FileUpload from 'primevue/fileupload'
import Message from 'primevue/message'
import ProgressSpinner from 'primevue/progressspinner'
import { ref } from 'vue'
const props = defineProps({
  accept: {
    default: 'image/*',
    type: String,
  },
  bucket: {
    default: 'avatars',
    type: String,
  },
  client: {
    default: null,
    type: Object,
  },
  config: {
    default: null,
    type: Object,
  },
  currentUser: {
    default: null,
    type: Object,
  },
  currentUserProfile: {
    default: null,
    type: Object,
  },
  fileLimit: {
    default: 1,
    type: Number,
  },
  image: {
    default: '',
    required: true,
    type: String,
  },
  label: {
    default: 'Upload Image',
    type: String,
  },
  maxFileSize: {
    default: 1000000,
    type: Number,
  },
  success: {
    default: 'Success! Your changes have been saved.',
    type: String,
  },
  table: {
    default: 'profiles',
    type: String,
  },
})

const emit = defineEmits(['image-uploaded'])

const innerClient = ref(props.client)
const innerConfig = ref(props.config)
// fallback incase the parent component doesn't pass in the client and config
if (!props.client && !props.config) {
  innerClient.value = useSupabaseClient()
  innerConfig.value = useRuntimeConfig()
}

const supabase = innerClient.value

const uploading = ref(false)
const errorMessage = ref()
const successMessage = ref()
const imageUrl = ref(props.image)

const uploadImage = async (event) => {
  try {
    uploading.value = true
    const file = event.files[0]
    const fileExt = file.name.split('.').pop()
    const filePath = `${props.userId}-${Math.random()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from(props.bucket)
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data: imagePublicUrl } = await supabase.storage
      .from(props.bucket)
      .getPublicUrl(filePath)

    imageUrl.value = imagePublicUrl.publicUrl

    const { error } = await supabase
      .from(props.table)
      .upsert({
        avatar_image_url: imageUrl.value,
        id: props.currentUser.id,
        updated_at: new Date().toISOString(),
      })
      .match({ id: props.currentUser.id })
    if (error) {
      //console.log(error)
      errorMessage.value = `Error: ${error}`
    } else {
      successMessage.value = props.success
      props.currentUserProfile.avatar_image_url = imageUrl.value
      emit('image-uploaded', imageUrl.value)
    }
  } catch (error) {
    errorMessage.value = `Error: ${error}`
  } finally {
    uploading.value = false
  }
}

// delete the image from the database and storage
const deleteImage = async () => {
  const { error } = await supabase
    .from('profiles')
    .upsert({
      avatar_image_url: null,
      id: props.currentUser.id,
      updated_at: new Date().toISOString(),
    })
    .match({ id: props.currentUser.id })
  if (error) {
    //console.log(error)
    errorMessage.value = `Error: ${error}`
  } else {
    successMessage.value = 'Success! Your file has been deleted.'
    imageUrl.value = null
    props.currentUserProfile.avatar_image_url = null
  }
}
</script>

<template>
  <div class="upload-image flex flex-column align-items-center">
    <ProgressSpinner v-if="uploading" class="inline-block mb-4" />
    <img
      v-else-if="imageUrl"
      :src="imageUrl"
      alt="profile photo"
      class="mb-4"
    />
    <slot v-else name="above-button"> </slot>
    <div class="flex">
      <FileUpload
        mode="basic"
        :custom-upload="true"
        :accept="props.accept"
        :max-file-size="props.maxFileSize"
        :file-limit="props.fileLimit"
        :choose-label="props.label"
        :auto="true"
        @uploader="uploadImage"
      />
    </div>
    <Button v-if="imageUrl" class="p-button-danger mt-4" @click="deleteImage">
      Remove Image
    </Button>
    <slot name="below-button"></slot>

    <template v-if="errorMessage">
      <Message class="mt-4" severity="error">
        {{ errorMessage }}
      </Message>
    </template>
    <template v-if="successMessage">
      <Message :sticky="false" :life="5000" class="mt-4" severity="success">
        {{ successMessage }}
      </Message>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.upload-image {
  img {
    height: 150px;
    width: 150px;
    border-radius: 50%;
  }
}
</style>
