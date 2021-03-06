package com.psy.controller.post;

import com.psy.controller.authority.Login;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

/**
 * Created by kai.wang on 12/4/13.
 */
@Controller
@RequestMapping("/edit")
public class EditPostController {

    @Login
    @RequestMapping("post/{value}")
    public String editPost(HttpSession session, @PathVariable int value, ModelMap model) {
        model.addAttribute("page", value);
        return "edit_post";
    }
}
