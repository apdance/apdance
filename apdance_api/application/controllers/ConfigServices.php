<?php
/**
 * Created by PhpStorm.
 * User: MAXX-DEV-PC
 * Date: 13/12/2017
 * Time: 17:37
 */
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class ConfigServices extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();

        //$this->output->set_content_type('application/json');
        $this->output->set_header('Access-Control-Allow-Origin: *');
    }


    /**
     *
    */
    public function app_config_cadastro_get(){

        $this->db->from("access_type");
        $this->db->where("access_type_active", 1);

        $res = $this->db->get()->result_array();

        $this->response(array(
            'success'=>true,
            'metadata'=>array(
                'totalCount'=>count($res),
                'resource'=>'access_type'
            ),
            'data'=>$res,
            'mag'=>'Success return'
        ));
    }
}