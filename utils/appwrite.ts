import { appwriteConfig } from "@/config/appwriteConfig";
import { useGlobalContext } from "@/providers/GlobalProvider";
import {
    Account, Avatars, Client, Databases, ID, ImageGravity, Query, Storage, Role,
    Models
} from "react-native-appwrite";



export interface File {
    name: string,
    mimeType: string;
    uri: string,
    size: number,
    [ key: string ]: any;

}

export interface Form {
    thumbnail: File | null,
    video: File | null,
    title: string,
    prompt: string,
    userId: string,
}

export interface User {
    $id: string;
    email: string;
    username: string;
    avatar: string;
}

const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);


const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

const promise = account.updatePrefs({ darkTheme: true, language: 'en' });

promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});


// account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
//     .then(function (response) {
//         console.log(response);
//     }, function (error) {
//         console.log(error);
//     });
// Register user
export async function createUser(email: string, password: string, username: string): Promise<Models.User<Models.Preferences>> {
    const { setLoggedInUser, loggedInUser } = useGlobalContext();

    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username,
        );
        if (!newAccount) throw new Error('Error creating account');
        const avatarUrl = avatars.getInitials(username);


        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        );
        await login(email, password)

        const loggedInUser = await account.get();
        setLoggedInUser(loggedInUser);
        return loggedInUser;
    } catch (error) {
        throw new Error(String(error));
    }
}

// Get Account
export async function getAccount() {

    try {
        const currentAccount = await account.get();
        return currentAccount;
    } catch (error) {
        throw new Error(String(error));
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount();
        if (!currentAccount) throw new Error('No current account');

        const currentUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [ Query.equal("accountId", currentAccount.$id) ]);

        if (!currentUser || currentUser.documents.length === 0) throw new Error('No current user');

        // return currentUser.documents[ 0 ];
        return currentAccount;
    } catch (error) {
        throw new Error(String(error));
    }
}


export async function login(email: string, password: string) {
    const { setLoggedInUser, loggedInUser } = useGlobalContext();

    try {
        await account.createEmailPasswordSession(email, password);
        return setLoggedInUser(await account.get());

    } catch (error) {
        throw new Error(String(error));
    }
}


export async function logout(): Promise<void> {
    try {
        await account.deleteSession("current");


    } catch (error) {
        throw new Error(String(error));
    }
}



export async function uploadFile(file: File | null, type: string): Promise<string | URL | undefined> {
    if (!file) return;

    const { mimeType, ...rest } = file;
    const asset = { type: mimeType, ...rest };
    try {
        const uploadedFile = await storage.createFile(appwriteConfig.storageId, ID.unique(), asset);

        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        return fileUrl;

    } catch (error) {
        throw new Error(String(error));
    }
}

export async function getFilePreview(fileId: string, type: string): Promise<string | URL> {
    let fileUrl;

    try {
        switch (type) {
            case "video":
                fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
                break;

            case "image":
                fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000, ImageGravity.Top, 100);
                break;

            default:
                throw new Error("Invalid file type");
            // break;
        }
        if (!fileUrl) throw new Error("Error getting file preview");

        return fileUrl;
    } catch (error) {
        throw new Error(String(error));
    }
}

export async function createVideoPost(form: Form) {
    try {
        const [ thumbnailUrl, videoUrl ] = await Promise.all([
            uploadFile(form.thumbnail, "image"),
            uploadFile(form.video, "video")
        ]);

        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId,
            });

        return newPost;
    } catch (error) {
        throw new Error(String(error))
    }

}

export async function getPosts() {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId
        );

        return posts;

    } catch (error) {
        throw new Error(String(error))
    }
}

export async function getAllPosts(): Promise<any[]> {
    try {
        const posts = await getPosts();
        return posts.documents;
    } catch (error) {
        throw new Error(String(error));
    }
}

export async function getPostsTotal() {
    try {
        const posts = await getPosts();
        return posts.total;
    } catch (error) {
        throw new Error(String(error));
    }
}


export async function getCreatorPosts(userId: string): Promise<any[]> {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [ Query.equal("creator", userId) ]);
        return posts.documents;
    } catch (error) {
        throw new Error(String(error));
    }
}

export async function searchPosts(query: string): Promise<any[]> {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [ Query.search("title", query) ]);

        if (!posts) throw new Error("An error has occured");
        return posts.documents;
    } catch (error) {
        throw new Error(String(error));
    }
}

export async function getLatestPosts(): Promise<any[]> {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [ Query.orderDesc("$createdAt"), Query.limit(10) ]);

        return posts.documents;
    } catch (error) {
        throw new Error(String(error));
    }
}