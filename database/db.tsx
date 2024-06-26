import { StatusBar } from 'expo-status-bar';
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase, openDatabaseSync } from 'expo-sqlite';
import {
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button, } from 'react-native';
import {
    enablePromise,
    openDatabase,
  } from "react-native-sqlite-storage";

import {useCallback, useEffect, useState} from "react";
import * as SQLite from "expo-sqlite";
import Constants from "expo-constants";
import { isBreakOrContinueStatement } from 'typescript';

enablePromise(true)


export const connectToDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync('databaseName');
  } catch (error) {
    console.error(error)
      throw Error(`Failed to create database`)
  }
  
}
export const createTables = async (db: SQLiteDatabase) => {
  
    try {
      const user = await db.execAsync (`
    CREATE TABLE IF NOT EXISTS User (
        id INTEGER DEFAULT 1,
        colorPreference TEXT,
        languagePreference TEXT,
        PRIMARY KEY(id)
    )`)
    } catch (error) {
      console.error(error)
      throw Error(`Failed to create tables`)
    }
    }

