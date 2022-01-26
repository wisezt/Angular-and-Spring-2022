package com.ting.ecommerce.config;

import com.ting.ecommerce.entity.Country;
import com.ting.ecommerce.entity.Product;
import com.ting.ecommerce.entity.ProductCategory;
import com.ting.ecommerce.entity.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager){
        entityManager = theEntityManager;
    }


    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {


        HttpMethod[] theUnsupportedActions = { HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE} ;

        // disable HTTP methods for Product: PUT.POST and DELETE
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));


        // disable HTTP methods for ProductCategory: PUT.POST and DELETE
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));


        // disable HTTP methods for State: PUT.POST and DELETE
        config.getExposureConfiguration()
                .forDomainType(State.class)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));


        // disable HTTP methods for Country: PUT.POST and DELETE
        config.getExposureConfiguration()
                .forDomainType(Country.class)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));


        // call an internal helper method
        exposeIds(config);
    }


    private void exposeIds(RepositoryRestConfiguration config){

//        Set<EntityType<?>> entities =entityManager.getMetamodel().getEntities();
//
//        List<Class> entityClasses = new ArrayList<>();
//
//        for (EntityType tempEntityTypes : entities){
//            entityClasses.add(tempEntityTypes.getJavaType());
//        }
//
//        Class[] domainType = entityClasses.toArray(new Class[0]);


        Class[] domainType = {Product.class, ProductCategory.class};


        config.exposeIdsFor(domainType);
//        config.exposeIdsFor(Product.class);
//        config.exposeIdsFor(ProductGategory.class);






    }

}
