import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MediaUploadState {
  mediaType: string;
  galleryFiles: File[];
  featuredImage: File | null;
}

const initialState: MediaUploadState = {
  mediaType: "image",
  galleryFiles: [],
  featuredImage: null,
};

const mediaUploadSlice = createSlice({
  name: "mediaUpload",
  initialState,
  reducers: {
    setMediaType(state, action: PayloadAction<string>) {
      state.mediaType = action.payload;
    },
    addGalleryFiles(state, action: PayloadAction<File[]>) {
      // Limit to 10 images
      state.galleryFiles = [...state.galleryFiles, ...action.payload].slice(0, 10);
    },
    removeGalleryFile(state, action: PayloadAction<number>) {
      state.galleryFiles = state.galleryFiles.filter(
        (_, index) => index !== action.payload
      );
    },
    setFeaturedImage(state, action: PayloadAction<File | null>) {
      state.featuredImage = action.payload;
    },
  },
});

export const {
  setMediaType,
  addGalleryFiles,
  removeGalleryFile,
  setFeaturedImage,
} = mediaUploadSlice.actions;

export default mediaUploadSlice.reducer;
