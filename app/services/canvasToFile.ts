  export const canvasToFile = (canvas:any, filename:string, mimeType:any) => {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob:any) => {
        if (blob) {
          resolve(new File([blob], filename, { type: mimeType }));
        } else {
          reject(new Error('Canvas conversion to Blob failed.'));
        }
      }, mimeType);
    })}