import { v7 } from "uuid";
import { buckets, client } from "../supabase";



/**
 * Stores Image in bucket
 *
 * @param name Image name
 * @param image Image Data
 * @returns Image Public URL
 */
export async function storeImage(name: string, image: string) : Promise<string | null> {
    const imageBlob = base64ToBlob(image, 'image/jpeg');

    const path = `/${name}-${v7()}.jpeg`; // Generates Path name
    const { data, error } = await client.storage.from(buckets.questions).upload(path, imageBlob, {
        contentType: "image/jpeg"
    });
    if(error) {
        console.error(error);
        return null;
    }


    // Returns Image Path
    return client.storage.from(buckets.questions).getPublicUrl(data.path).data.publicUrl;
}





// Function to convert a Base64 string to a Blob
function base64ToBlob(base64: string, mimeType: string) {
    const byteCharacters = atob(base64.split(',')[1]); // Decode Base64 string
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset++) {
        const byte = byteCharacters.charCodeAt(offset);
        byteArrays.push(byte);
    }

    return new Blob([new Uint8Array(byteArrays)], { type: mimeType });
}
