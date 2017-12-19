<?php
/**
 * Created by PhpStorm.
 * User: MAXX-DEV-PC
 * Date: 13/12/2017
 * Time: 17:37
 */

class ConfigServices extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();

        $this->output->set_content_type('application/json');
        $this->output->set_header('Access-Control-Allow-Origin: *');
    }




    /**
     *
    */
    public function app_access_type(){
        $this->output->set_header('HTTP/1.0 200 OK');

        $this->db->from("access_type");
        $res = $this->db->get()->result_array();


        echo json_encode(array(
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