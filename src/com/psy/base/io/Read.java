package com.psy.base.io;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.Properties;

/**
 * Created by kai.wang on 11/29/13.
 */
public class Read {

	public static String SQL_PATH = "";

	static {
		Properties sqlProperties = readProperties("sql.properties","sql.");
		SQL_PATH = sqlProperties.getProperty("path");
	}

	private static Properties readProperties(String fileName,String startWith){
		Properties rawProperties = new Properties();
		Properties properties = new Properties();
		try {
			rawProperties.load(Read.class.getResourceAsStream(fileName));
			for (Object key : rawProperties.keySet()) {
				String skey = (String) key;
				if (skey.startsWith(startWith)) {
					String name = skey.substring(startWith.length());
					properties.put(name, rawProperties.getProperty(skey));
				}
			}
		}catch (IOException e) {
			e.printStackTrace();
		}
		return properties;
	}

	public static String readSql(String sqlName) {
		File file = new File(SQL_PATH + sqlName);
		System.out.println(file.getAbsolutePath());
		StringBuffer sql = new StringBuffer((int) file.length());
		BufferedReader reader = null;
		try {
			reader = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));
			String line = null;
			while ((line = reader.readLine()) != null) {
				if(line.startsWith("#")){
					continue;
				}
				sql.append(line);
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (reader != null) {
				try {
					reader.close();
				} catch (Exception e) {
				}
			}
		}
		return sql.toString();
	}

}