package com.psy.dao;

import com.psy.base.db.DBManager;
import com.psy.base.db.QueryHelper;
import com.psy.base.utils.StringUtils;
import com.psy.bean.Post;
import com.psy.bean.view.HomePost;
import com.psy.bean.view.ViewPost;
import com.psy.common.Const;
import com.psy.common.SQL;
import com.psy.common.Utils;
import com.psy.controller.post.FormPost;

import org.apache.commons.dbutils.QueryRunner;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

/**
 * Created by kai.wang on 12/13/13.
 */
public class PostDao {

    /**
     * 添加新文章
     *
     * @param post
     * @return
     */
    public static int addPost(FormPost post) {
        Connection connection = null;
        try {
            connection = DBManager.getDataSource().getConnection();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        QueryRunner runner = new QueryRunner();

        // 添加媒體信息
        int count = 0;
        if (!StringUtils.isEmpty(post.getCoverUrl())) {
            count = QueryHelper.update(runner, connection, SQL.ADD_META, Const.SITE_PREFIX + post.getCoverUrl());
            int cover = (int) QueryHelper.queryNumber(runner, connection, SQL.LAST_INSERT_ID);
            post.setCover(cover);
        }

        int subLength = post.getContent().length() > 40 ? 40 : post.getContent().length();
        post.setIntro(post.getContent().substring(0, subLength));
        // USER_ID,TITLE,COVER,INTRO,CONTENT,STATUS
        count += QueryHelper.update(runner, connection, SQL.ADD_POST, post.getUserId(), post.getTitle(), post.getCover(), post.getIntro(), post.getContent(), Post.STATUS_NOT_AUDIT);
        return count;
    }

    /**
     * 根据状态查找文章
     *
     * @param status
     * @param page    大于1
     * @param perPage
     * @return
     */
    public static List<ViewPost> findPostByStatus(int status, int page, int perPage) {
        page = Utils.parsePage(page);
        List<ViewPost> list = null;
        QueryRunner runner = new QueryRunner(DBManager.getDataSource());
        int limitStart = (page - 1) * perPage;
        list = QueryHelper.queryBeanList(runner, ViewPost.class, SQL.FIND_POST_BY_STATUS, status, limitStart, perPage);
        return list;
    }

    /**
     * 根据状态计算文章数
     *
     * @param status
     * @return
     */
    public static long countPostByStatus(int status) {
        QueryRunner runner = new QueryRunner(DBManager.getDataSource());
        return QueryHelper.queryCount(runner, SQL.COUNT_POST_BY_STATUS, status);
    }

    /**
     * 批量修改文章状态
     *
     * @param status
     * @return
     */
    public static int changePostStatusByIds(Integer[] ids, int status) {
        if (ids == null || ids.length == 0) {
            return 0;
        }
        String strId = "";
        for (int i = 0; i < ids.length; i++) {
            if (i != ids.length - 1) {
                strId += ids[i] + ",";
            } else {
                strId += ids[i];
            }
        }
        QueryRunner runner = new QueryRunner(DBManager.getDataSource());
        return QueryHelper.update(runner, null, SQL.CHANGE_POST_STATUS_BY_IDS, status, strId);
    }

    /**
     * 查找首页文章列表
     *
     * @param page
     * @param perPage
     * @return
     */
    public static List<HomePost> findHomePostList(int page, int perPage) {
        page = Utils.parsePage(page);
        List<HomePost> list = null;
        QueryRunner runner = new QueryRunner(DBManager.getDataSource());
        int limitStart = (page - 1) * perPage;
        list = QueryHelper.queryBeanList(runner, HomePost.class, SQL.FIND_HOME_POST_LIST, Post.STATUS_NORMAL, limitStart, perPage);
        return list;
    }

    /**
     * 查找首页文章列表
     *
     * @param page
     * @param perPage
     * @return
     */
    public static List<HomePost> findAllPostList(int page, int perPage) {
        page = Utils.parsePage(page);
        List<HomePost> list = null;
        QueryRunner runner = new QueryRunner(DBManager.getDataSource());
        int limitStart = (page - 1) * perPage;
        list = QueryHelper.queryBeanList(runner, HomePost.class, SQL.FIND_ALL_POST_LIST, limitStart, perPage);
        return list;
    }

    /**
     * 根据ID查找文章内容
     *
     * @param id
     * @return
     */
    public static ViewPost findPostById(int id) {
        QueryRunner runner = new QueryRunner(DBManager.getDataSource());
        return QueryHelper.queryBean(runner, ViewPost.class, null, SQL.FIND_POST_BY_ID, id);
    }
}
