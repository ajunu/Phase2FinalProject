package com.dd.schoolAdminPanel.teachersDAO;

import java.util.List;

import org.hibernate.Session;

import com.dd.schoolAdminPanel.teachersBean.Teachers;

public interface TeachersDAOInterface {
	
	public Session userDetailsSessionFactory();
	
	public void addTeachers(Teachers teachers);
	
	public List<Teachers> listTeachers();
	
	public void deleteTeachers(Teachers teachers);
	
	public Teachers getTeachers(Teachers teachers);
	
	public void editTeachers(Teachers teachers);

	

}