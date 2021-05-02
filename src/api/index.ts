import axios from 'axios';
import Config from 'react-native-config';
import { captureException } from '@sentry/react-native';
import { Card } from '../redux/decks/reducer';
import { Logger } from '../service/Logger';

interface File {
  uri: string;
  name: string;
  type: string;
}

export interface ResponseDeck {
  id: string;
  title: string;
  owner: string;
  share_id: string;
  cards: Card[];
}

async function savePhoto(
  file: File,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
): Promise<string[]> {
  const formData = new FormData();
  formData.append('photo', file as any);
  const response = await axios.post(`${Config.API_URL}/image`, formData, {
    timeout: 15000,
    onUploadProgress,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.photo;
}

async function contact(data: {}): Promise<{ data: boolean }> {
  try {
    const response = await axios.post(`${Config.API_URL}/contact`, data);
    return response.data;
  } catch (error) {
    Logger.sendLocalError(error, 'contact');
    captureException(error);
    return error;
  }
}

async function saveDeck(data: {}): Promise<{ data: boolean }> {
  try {
    const response = await axios.post(`${Config.API_URL}/deck`, data);
    return response.data;
  } catch (error) {
    Logger.sendLocalError(error, 'saveDeck');
    captureException(error);
    return error;
  }
}

async function editDeckByShareId(data: {}, shareId: string): Promise<{ data: boolean }> {
  try {
    const response = await axios.post(`${Config.API_URL}/deck/${shareId}`, data);
    return response.data;
  } catch (error) {
    Logger.sendLocalError(error, 'editDeckByShareId');
    captureException(error);
    return error;
  }
}

async function getSharedDeckBySharedId(sharedId: string): Promise<{ data: ResponseDeck }> {
  console.log(Config.API_URL);
  try {
    const response = await axios.get(`${Config.API_URL}/deck/${sharedId}`);
    console.log('response', response, Config.API_URL);
    return response.data;
  } catch (error) {
    Logger.sendLocalError(error, 'getSharedDeckBySharedId');
    captureException(error);
    return error;
  }
}

const Api = {
  savePhoto,
  contact,
  saveDeck,
  getSharedDeckBySharedId,
  editDeckByShareId,
};

export default Api;
