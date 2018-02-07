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

    public function vincular_organizacao_post(){
        //check session active$
        $this->db->where("session_token", $this->head('token'));

        $session = $this->db->get("session")->row_object();

        $ok= $this->db->insert("user_org", array(
            'user_id'=>$session->session_user_id,
            'org_id'=>$this->post("organizacao")
        ));


        $this->response(array(
            'success'=>!empty($ok),
            'msg'=>!empty($ok) ? "Vinculo realizado com sucesso" : "Não foi possível realizar o vinculo com esta instituição"
        ));
    }
}