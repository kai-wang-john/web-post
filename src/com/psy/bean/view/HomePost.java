package com.psy.bean.view;

/**
 * Created by kai.wang on 12/18/13.
 */
public class HomePost {
//	P.ID AS ID,
//	U.AVATAR AS HEAD,
//	P.TITLE AS TITLE,
//	T.NAME AS TAG,
//	U.NAME AS USERNAME,
//	P.CREATE_AT AS TIME
	private String id;
	private String HEAD;
	private String title;
	private String tag;
	private String username;
	private String createAt;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getHEAD() {
		return HEAD;
	}

	public void setHEAD(String HEAD) {
		this.HEAD = HEAD;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getCreateAt() {
		return createAt;
	}

	public void setCreateAt(String createAt) {
		this.createAt = createAt;
	}
}
