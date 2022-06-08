package com.example.myadsapp.io.entity.converters;

import com.example.myadsapp.io.entity.enums.QueryOperator;
import com.example.myadsapp.io.repository.filter.AdFilter;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class AdFilterConverter {

    public static List<AdFilter> convertStringToFilter(String json) {
        List<AdFilter> filters = new ArrayList<>();
        if (json != null) {
            JSONArray jsonArray = new JSONArray(json);

            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject jsonObj = jsonArray.getJSONObject(i);

                if (jsonObj.get("value").equals(JSONObject.NULL)) continue;

                AdFilter filterRequest = AdFilter.builder()
                        .property(jsonObj.getString("property"))
                        .operator(QueryOperatorConverter.convertAttribute(jsonObj.getString("operator")))
                        .build();

                if (filterRequest.getOperator().equals(QueryOperator.IN)) {
                    List<String> values = new ArrayList<>();

                    JSONArray jsonValues = jsonObj.getJSONArray("value");
                    for (int j = 0; j < jsonValues.length(); j++) {
                        values.add(jsonValues.getString(j));
                    }

                    filterRequest.setValues(values);
                } else if (filterRequest.getOperator().equals(QueryOperator.BETWEEN)) {
                    List<String> values = new ArrayList<>(2);

                    JSONArray jsonValues = jsonObj.getJSONArray("value");
                    for (int j = 0; j < jsonValues.length(); j++) {
                        values.add(String.valueOf(jsonValues.getDouble(j)));
                    }

                    filterRequest.setValues(values);
                } else {
                    if (filterRequest.getOperator().equals(QueryOperator.GREATER_THAN) ||
                            filterRequest.getOperator().equals(QueryOperator.LESS_THAN)) {

                        filterRequest.setValue(String.valueOf(jsonObj.getDouble("value")));
                    } else {
                        filterRequest.setValue(jsonObj.getString("value"));
                    }
                }

                filters.add(filterRequest);
            }
        }

        return filters;
    }
}
