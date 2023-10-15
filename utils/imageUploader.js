export const imageUploader = async (selectedImage) => {
    if (selectedImage) {
      try {
        const formData = new FormData();
        formData.set('file', selectedImage);
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          console.log('Image uploaded successfully.');
          // setSelectedImage(null);
        } else {
          console.error('Image upload failed.');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      return null
    }
  };